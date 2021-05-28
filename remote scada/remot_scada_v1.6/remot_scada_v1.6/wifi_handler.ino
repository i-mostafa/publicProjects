void connectToWIFI(const char *ssid, const char *password)
{
  WiFi.mode(WIFI_STA);
  delay(1000);     
  WiFi.begin(ssid, password);
  Serial.println("");
  Serial.print("Connecting");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}


String sendGetRequest(String host,String msg){
  String payload;
  HTTPClient http;  
  String link = host + "nodeData?nodeId="+String(ID)+"&msg=" + msg;
  http.begin(link); 
  int httpCode = http.GET();                                
  if (httpCode > 0) { 
  payload = http.getString();   
  //Serial.println(payload);                     
  }
  http.end();     
  delay(REFRESH_RATE); 
  return payload;
}
  
