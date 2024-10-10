using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.ReservationStatus.CreateReservationStatus;
using AracTakip.Application.Features.Commands.ReservationStatus.RemoveReservationStatus;
using AracTakip.Application.Features.Commands.ReservationStatus.UpdateReservationStatus;
using AracTakip.Application.Features.Queries.ReservationStatus.GetAllReservationStatus;
using AracTakip.Application.Features.Queries.ReservationStatus.GetByIdReservationStatus;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationStatusesController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<ReservationStatusesController> _logger;

        public ReservationStatusesController(IMediator mediator, ILogger<ReservationStatusesController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
        [HttpGet("get-all-reservation-statuses")]
        public async Task<IActionResult> Get([FromQuery] GetAllReservationStatusQueryRequest getAllReservationStatusQueryRequest)
        {
            GetAllReservationStatusQueryResponse response = await _mediator.Send(getAllReservationStatusQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-by-id-reservation-status/{StatusId}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdReservationStatusQueryRequest getByIdReservationStatusQueryRequest)
        {
            GetByIdReservationStatusQueryResponse response = await _mediator.Send(getByIdReservationStatusQueryRequest);
            return Ok(response);
        }
        [HttpPost("add-reservation-status")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.ReservationStatues, ActionType = ActionType.Writing, Definition = "Rezervasyon Durumu Ekle")]
        public async Task<IActionResult> Post(CreateReservationStatusCommandRequest createReservationStatusCommandRequest)
        {
            CreateReservationStatusCommandResponse response = await _mediator.Send(createReservationStatusCommandRequest);
            return Ok(response);
        }
        [HttpPut("update-reservation-status")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.ReservationStatues, ActionType = ActionType.Updating, Definition = "Rezervasyon Durumunu Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateReservationStatusCommandRequest updateReservationStatusCommandRequest)
        {
            UpdateReservationStatusCommandResponse response = await _mediator.Send(updateReservationStatusCommandRequest);
            return Ok(response);
        }
        [HttpDelete("delete-reservation-status/{StatusId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.ReservationStatues, ActionType = ActionType.Deleting, Definition = "Rezervasyon Durumunu Sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveReservationStatusCommandRequest removeReservationStatusCommandRequest)
        {
            RemoveReservationStatusCommandResponse response = await _mediator.Send(removeReservationStatusCommandRequest);
            return Ok(response);
        }
    }
}
