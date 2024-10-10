using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.Company.CreateCompany;
using AracTakip.Application.Features.Commands.Company.RemoveCompany;
using AracTakip.Application.Features.Commands.Company.UpdateCompany;
using AracTakip.Application.Features.Queries.Company.GetAllCompany;
using AracTakip.Application.Features.Queries.Company.GetByIdCompany;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Admin")]
    public class CompaniesController : ControllerBase
    {
        readonly IMediator _mediator;

        public CompaniesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("get-all-companies")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Companies, ActionType = ActionType.Reading, Definition = "Tüm şirketlerin listelenmesi")]
        public async Task<IActionResult> Get([FromQuery] GetAllCompanyQueryRequest getAllCompanyQueryRequest)
        {
            GetAllCompanyQueryResponse response = await _mediator.Send(getAllCompanyQueryRequest);
            return Ok(response);
        }

        [HttpGet("get-by-id-company/{CompanyId}")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Companies, ActionType = ActionType.Reading, Definition = "İlgili şirketin listelenmesi")]
        public async Task<IActionResult> Get([FromRoute] GetByIdCompanyQueryRequest getByIdCompanyQueryRequest)
        {
            GetByIdCompanyQueryResponse response = await _mediator.Send(getByIdCompanyQueryRequest);
            return Ok(response);
        }

        [HttpPost("add-company")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Companies, ActionType = ActionType.Writing, Definition = "Şirket ekle")]
        public async Task<IActionResult> AddCompany(CreateCompanyCommandRequest createCompanyCommandRequest)
        {
            CreateCompanyCommandResponse response = await _mediator.Send(createCompanyCommandRequest);
            return StatusCode((int)HttpStatusCode.Created);
        }
        [HttpPut("update-company")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Companies, ActionType = ActionType.Updating, Definition = "Şirket güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCompanyCommandRequest updateCompanyCommandRequest)
        {
            UpdateCompanyCommandResponse response = await _mediator.Send(updateCompanyCommandRequest);
            return Ok();
        }
        [HttpDelete("delete-company/{ComapnyId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Companies, ActionType = ActionType.Deleting, Definition = "Şirket sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveCompanyCommandRequest removeCompanyCommandRequest)
        {
            RemoveCompanyCommandResponse response = await _mediator.Send(removeCompanyCommandRequest);
            return Ok();
        }


    }
}
