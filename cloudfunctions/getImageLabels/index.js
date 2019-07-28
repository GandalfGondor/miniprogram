// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const tencentcloud = require("tencentcloud-sdk-nodejs");

const TiiaClient = tencentcloud.tiia.v20190529.Client;
const models = tencentcloud.tiia.v20190529.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

var detectLabel = function(region, url){
  let cred = new Credential("AKIDzpRq58uc2GJev1db6EBVhqnVysZ4ndnm", "wkiT9mDYhfOtBIE2lJeqrgNiu0xmPp1z");
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "tiia.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new TiiaClient(cred, region, clientProfile);

  let req = new models.DetectLabelRequest();

  let params = '{"ImageUrl":"' + url + '"}';
  req.from_json_string(params);

  return new Promise(function(resolve, reject){
    client.DetectLabel(req, function (errMsg, response) {
      if (errMsg) {
        reject(errMsg);
      }
      else{
        resolve(response);
      }
    });
  })

}


// 云函数入口函数
exports.main = async (event, context) => {
  
  return await detectLabel(event.Region, event.ImageUrl)

}