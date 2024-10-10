using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AracTakip.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CarCaseTypeId",
                table: "Cars",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "CarCaseType",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CarCaseTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarCaseType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CarCaseTypeId",
                table: "Cars",
                column: "CarCaseTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CarCaseType_CarCaseTypeId",
                table: "Cars",
                column: "CarCaseTypeId",
                principalTable: "CarCaseType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CarCaseType_CarCaseTypeId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "CarCaseType");

            migrationBuilder.DropIndex(
                name: "IX_Cars_CarCaseTypeId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarCaseTypeId",
                table: "Cars");
        }
    }
}
