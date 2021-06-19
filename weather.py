import requests
import json
from flask import request
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote_plus
import pytz
import datetime


def getLocation():
  key = '23c7dccb1ee5be1f3780348bacb5c2f8' 
  ip_address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
  send_url = 'http://api.ipstack.com/' + ip_address + '?access_key=' + key 

  r = requests.get(send_url) 
  j = json.loads(r.text)

  return j


def getWeather():
  url = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst"
  service_key = "L3+iSEpSWmyt/WOCfPWM7FGm1VFKlDiIeDm4OJ8pouGCm7DLYWT+7tfgJ3TACDrtdamcVTbtTlYga5PgCxIfbA=="

  # 현재 날짜 및 시간, 위치
  now = getTime()
  nowDate = now[0]
  nowTime = now[1]
  nowLocation = { "x":126, "y":127 } # 임시 위치

  # 웹 요청시 같이 전달될 데이터 = 요청 메시지
  params = {
      quote_plus('serviceKey') : service_key,
      quote_plus('numOfRows') : 30,
      quote_plus('pageNo') : 1,
      quote_plus('dataType') : 'JSON',
      quote_plus('base_date') : nowDate, # 오늘 날짜
      quote_plus('base_time') : nowTime, # 요청 가능 발표 시간
      quote_plus('nx') : nowLocation["x"],
      quote_plus('ny') : nowLocation["y"]
  }

  response = requests.get(url=url , params=params)
  queryParams = '?' + urlencode(params)
  request = Request(url + queryParams)
  request.get_method = lambda: 'GET'
  response = urlopen(request).read()

  r_dict = json.loads(response)
  r_response = r_dict.get("response")
  r_body = r_response.get("body")
  r_items = r_body.get("items")
  r_item = r_items.get("item")

  result = {}
  
  for item in r_item:
    if(item.get("baseTime") != ""):
      result["시간"] = item.get("baseTime")
      break

  for item in r_item:
    if(item.get("category") == "T1H"):
      result["기온"] = item.get("obsrValue") # obsrValue # fcstValue
      break

  for item in r_item:
    if(item.get("category") == "RN1"):
      result["1시간 강수량"] = item.get("obsrValue")
      break

  for item in r_item:
    if(item.get("category") == "SKY"): 
      result["하늘상태"] = int(item.get("obsrValue"))
      break
    else:
      result["하늘상태"] = 9999

  for item in r_item:
    if(item.get("category") == "REH"):
      result["습도"] = item.get("obsrValue")
      break

  for item in r_item:
    if(item.get("category") == "PTY"): 
      result["강수형태"] = int(item.get("obsrValue"))
      break

  for item in r_item:
    if(item.get("category") == "LGT"): 
      result["낙뢰"] = item.get("obsrValue")
      break

  for item in r_item:
    if(item.get("category") == "VEC"): 
      result["풍향"] = int(item.get("obsrValue"))
      break

  for item in r_item:
    if(item.get("category") == "WSD"): 
      result["풍속"] = float(item.get("obsrValue"))
      break

  print("=== response dictionary(python object) data end ===")
  return result


def getTime():
  # UTC 현재 시간
  dt = datetime.datetime.now(datetime.timezone.utc)

  # 현지 타임존 정보
  KST = pytz.timezone('Asia/Seoul')

  # UTC 현재 시간 -> 현지 시간으로 변경
  dt_korea = dt.astimezone(KST)

  time = str(dt_korea).split()
  time[0] = time[0].replace("-", "")
  hh = time[1].split(":")[0]
  mm = time[1].split(":")[1]
  time[1] = str(hh) + str(mm)
  
  return time
