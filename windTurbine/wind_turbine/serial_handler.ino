void serialEvent() {
  while (Serial.available()) 
  {
    char inChar = (char)Serial.read();
    inputString += inChar;
    if (inChar == '\n') stringComplete = true;
  }
}

void sendData(){
   Serial.println("{\"temp\":" + (String)temp + ",\"windAngle\":" + (String) windAngle + ",\"turbineAngle\":" + (String) turbineAngle +",\"mode\":" + 
   (String)(mode == 'A' ? "\"A\"": "\"M\"") + "}"  );
   timer = millis();
}
