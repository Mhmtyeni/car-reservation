﻿using MediatR;
using System.ComponentModel;

namespace AracTakip.Application.Features.Queries.AppUser.GetAllUsers
{
    public class GetAllUsersQueryRequest :IRequest<GetAllUsersQueryResponse>
    {
        [DefaultValue(0)]
        public int Page { get; set; } = 0;
        [DefaultValue(5)]
        public int Size { get; set; } = 5;
    }
}