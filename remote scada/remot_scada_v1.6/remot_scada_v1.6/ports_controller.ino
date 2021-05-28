void applyChanges(String state[], String value[])
{
  for(int i = 0; i < DATA_SIZE-2; i++)
  {
    Serial.println(i);
    if(state[i] == "") break;
    else 
    {
      if(state[i] == "ANALOG")
          value[i] = String(analogRead(A0));
      else if(state[i] == "INPUT"){
          value[i] = String(valToStr(digitalRead(pinName[i])));
      }
      else if(state[i] == "OUTPUT")
      {
        digitalWrite(pinName[i], strToVal(value[i]));
      }
      else if(state[i] == "PWM")
      {        
        analogWrite(pinName[i], value[i].toInt());
      }
          
    }
  }
}

void pinInit(String state[])
{
  for(int i = 0; i < DATA_SIZE; i++)
  {
    Serial.println(i);
    if(state[i] == "") break;
    else 
    {
      if(state[i] == "INPUT")
          pinMode(pinName[i], INPUT);
      else if(state[i] == "OUTPUT" || state[i] == "PWM")
          pinMode(pinName[i], OUTPUT);
    }
  }
  
}
