void getData()
{
   unsigned long currentMillis = millis();
  
  if(currentMillis - previousMillis >= INTERVAL) {
     // Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED ){ 
      Data = httpGETRequest(host);
      output(Data);
      Serial.println("Data: " + Data);
      // save the last HTTP GET Request
      previousMillis = currentMillis;
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  }
}

String httpGETRequest(const char* serverName) {
  HTTPClient http;
    
  // Your IP address with path or Domain name with URL path 
  http.begin(serverName);
  
  // Send HTTP POST request
  int httpResponseCode = http.GET();
  
  String payload = "--"; 
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  return payload;  
}
