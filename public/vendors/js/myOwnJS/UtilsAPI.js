"use strict";

function postData(url = "", data = {}, onPost, onError) {

  $.ajax({
    contentType: "json",
    type: "post",
    url: url,
    data: JSON.stringify(data),
    dataType: "json",
    success: onPost,
    error: onError
  });
}

function getData(url = "", data = {}, onPost, onError) {

  $.ajax({
    contentType: "json",
    type: "get",
    url: url,
    data: JSON.stringify(data),
    dataType: "json",
    success: onPost,
    error: onError
  });
}


export {
  postData,
  getData
}
