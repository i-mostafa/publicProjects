void crateHotSpot(const char* ssid, const char* password)
{
  WiFi.softAP(ssid, password);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  serverRun();
  server.begin();
}


void serverRun(){
  server.on("/data", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", String(Data).c_str());
  });
}
