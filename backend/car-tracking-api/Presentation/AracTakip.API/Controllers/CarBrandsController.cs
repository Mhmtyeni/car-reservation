using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.CarBrand.CreateCarBrand;
using AracTakip.Application.Features.Commands.CarBrand.RemoveCarBrand;
using AracTakip.Application.Features.Commands.CarBrand.UpdateCarBrand;
using AracTakip.Application.Features.Commands.CarImageFile.ChangeShowcaseImage;
using AracTakip.Application.Features.Queries.CarBrand.GetAllCarBrand;
using AracTakip.Application.Features.Queries.CarBrand.GetByIdCarBrand;
using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarBrandsController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<CarBrandsController> _logger;

        public CarBrandsController(IMediator mediator, ILogger<CarBrandsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("get-all-car-brands")]
        public async Task<IActionResult> Get([FromQuery] GetAllCarBrandQueryRequest getAllCarBrandQueryRequest)
        {
            GetAllCarBrandQueryResponse response = await _mediator.Send(getAllCarBrandQueryRequest);
            return Ok(response);
        }

        [HttpGet("get-by-id-car-brand/{CarBrandId}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdCarBrandQueryRequest getByIdCarBrandQueryRequest)
        {
            GetByIdCarBrandQueryResponse response = await _mediator.Send(getByIdCarBrandQueryRequest);
            return Ok(response);
        }

        [HttpPost("add-car-brand")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarBrands, ActionType = ActionType.Writing, Definition = "Araba Markası Ekle")]
        public async Task<IActionResult> Post(CreateCarBrandCommandRequest createCarBrandCommandRequest)
        {
            CreateCarBrandCommandResponse response = await _mediator.Send(createCarBrandCommandRequest);
            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpPut("update-car-brand")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarBrands, ActionType = ActionType.Updating, Definition = "Araba Markasını Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCarBrandCommandRequest updateCarBrandCommandRequest)
        {
            UpdateCarBrandCommandResponse response = await _mediator.Send(updateCarBrandCommandRequest);
            return Ok();
        }

        [HttpDelete("delete-car-brand/{CarBrandId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarBrands, ActionType = ActionType.Deleting, Definition = "Araba Markasını Sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveCarBrandCommandRequest removeCarBrandCommandRequest)
        {
            RemoveCarBrandCommandResponse response = await _mediator.Send(removeCarBrandCommandRequest);
            return Ok();
        }
    }
}
