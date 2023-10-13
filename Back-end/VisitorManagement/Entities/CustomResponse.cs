﻿using System.Text.Json;

namespace VistorManagementOne.Entities
{
    public class CustomResponse
    {

        public bool IsSuccess { get; set; }
        public object Data { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
        public CustomResponse()
        {
            IsSuccess = false;
            StatusCode = StatusCodes.Status200OK;
        }

        public CustomResponse(bool _isSuccess, object _data, string _title, string _message)
        {
            IsSuccess = _isSuccess;
            Data = _data;
            Title = _title;
            Message = _message;
        }
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
        public void SetContent(bool _isSuccess, object _data, string _title, string _message)
        {
            IsSuccess = _isSuccess;
            Data = _data;
            Title = _title;
            Message = _message;
        }


    }
}
