using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.CarReservation.CreateCarReservation;
using AracTakip.Application.Features.Commands.CarReservation.UpdateCarReservation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarReservationController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<CarReservationController> _logger;

        public CarReservationController(IMediator mediator, ILogger<CarReservationController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
        [HttpPost("add-car-reservation")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarReservations, ActionType = ActionType.Writing, Definition = "Rezervasyon Oluştur")]
        public async Task<IActionResult> Post([FromForm ] CreateCarReservationCommandRequest createCarReservationCommandRequest)
        {
            CreateCarReservationCommandResponse response = await _mediator.Send(createCarReservationCommandRequest);
            return Ok(response);
        }
        [HttpPut("update-car-reservation")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarReservations, ActionType = ActionType.Updating, Definition = "Rezervasyon Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCarReservationCommandRequest updateCarReservationCommandRequest)
        {
            UpdateCarReservationCommandResponse response = await _mediator.Send(updateCarReservationCommandRequest);
            return Ok(response);
        }
    }
}
