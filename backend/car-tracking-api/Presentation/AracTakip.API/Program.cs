using AracTakip.API.Extensions;
using AracTakip.API.Filters;
using AracTakip.Application;
using AracTakip.Infrastructure;
using AracTakip.Infrastructure.Filters;
using AracTakip.Infrastructure.Services.Storage.Local;
using AracTakip.Persistence;
using AracTakip.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Context;
using Serilog.Core;
using Serilog.Sinks.MSSqlServer;
using System.Collections.ObjectModel;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();//Client'tan gelen request neticvesinde oluşturulan HttpContext nesnesine katmanlardaki class'lar üzerinden(busineess logic) erişebilmemizi sağlayan bir servistir.

builder.Services.AddPersistenceServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddApplicationServices();
builder.Services.AddSignalRServices();


builder.Services.AddStorage<LocalStorage>();
//builder.Services.AddStorage<AzureStorage>();
//builder.Services.AddStorage();

//builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
//policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()
//));
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:3000", "http://10.108.206.30:83") 
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()); // Kimlik doğrulama varsa ekleyin
});

var columnOptions = new ColumnOptions
{
    // Varsayılan kolonlar
    Store = new Collection<StandardColumn>
    {
        StandardColumn.Message,
        StandardColumn.MessageTemplate,
        StandardColumn.Level,
        StandardColumn.TimeStamp,
        StandardColumn.Exception,
        StandardColumn.Properties
    },

    // Ekstra kolonu burada ekleyebilirsiniz
    AdditionalColumns = new Collection<SqlColumn>
    {
        new SqlColumn("user_name", System.Data.SqlDbType.NVarChar)
    }
};

Logger log = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log.txt")
    .WriteTo.MSSqlServer(
        connectionString: builder.Configuration.GetConnectionString("MsSQL"),
        sinkOptions: new MSSqlServerSinkOptions { TableName = "logs", AutoCreateSqlTable = true },
        columnOptions: columnOptions
    )
    //.WriteTo.Seq(builder.Configuration["Seq:ServerURL"])
    .Enrich.FromLogContext()
    .MinimumLevel.Information()
    .CreateLogger();
builder.Host.UseSerilog(log);
builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
    options.Filters.Add<RolePermissionFilter>();
});
    //.AddFluentValidation(configuration => configuration.RegisterValidatorsFromAssemblyContaining<CreateCompanyValidator>())
    //.ConfigureApiBehaviorOptions(options => options.SuppressModelStateInvalidFilter = true);

builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
// Swagger servisini ekleyin
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "AracTakipAPI", Version = "v1" });
    // Yetkilendirme açıklamasını ekle
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });
    // Yetkilendirme gereksinimini ekle
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Admin", options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateAudience = true, //Oluşturulacak token değerini kimlerin/hangi originlerin/sitelerin kullanıcı belirlediğimiz değerdir. -> www.bilmemne.com
            ValidateIssuer = true, //Oluşturulacak token değerini kimin dağıttını ifade edeceğimiz alandır. -> www.myapi.com
            ValidateLifetime = true, //Oluşturulan token değerinin süresini kontrol edecek olan doğrulamadır.
            ValidateIssuerSigningKey = true, //Üretilecek token değerinin uygulamamıza ait bir değer olduğunu ifade eden suciry key verisinin doğrulanmasıdır.

            ValidAudience = builder.Configuration["Token:Audience"],
            ValidIssuer = builder.Configuration["Token:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"])),
            LifetimeValidator = (notBefore, expires, securityToken, validationParameters) => expires != null ? expires > DateTime.UtcNow : false,

            NameClaimType = ClaimTypes.Name //JWT üzerinde Name claimne karşılık gelen değeri User.Identity.Name propertysinden elde edebiliriz.
        };
    });

var app = builder.Build();

//app.UseMiddleware<SwaggerBasicAuthMiddleware>(); //Swagger arayüzüne basit bir kimlik doğrulama eklemek için bir ara yazılım sağlar.


// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseDeveloperExceptionPage();
//    app.UseSwagger();
//    //app.UseSwaggerUI();
//    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AracTakip V1"));
//}
app.UseSwagger();
app.UseSwaggerUI();
//app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AracTakip V1"));

app.ConfigureExceptionHandler<Program>(app.Services.GetRequiredService<ILogger<Program>>());
app.UseStaticFiles();
app.UseSerilogRequestLogging();

app.UseHttpLogging();
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    var username = context.User?.Identity?.IsAuthenticated != null || true ? context.User.Identity.Name : null;
    LogContext.PushProperty("user_name", username);
    await next();
});

app.MapControllers();
app.MapHubs();

app.Run();
