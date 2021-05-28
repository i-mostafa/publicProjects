// voice module codes

#define TURN_ON_RELAY_1  0x11
#define TURN_OFF_RELAY_1 0x12

#define TURN_ON_RELAY_2  0x13
#define TURN_OFF_RELAY_2 0x14

#define TURN_ON_RELAY_3  0x15
#define TURN_OFF_RELAY_3 0x16

#define TURN_ON_RELAY_4  0x17
#define TURN_OFF_RELAY_4 0x18

#define TURN_ON_RELAY_5  0x19
#define TURN_OFF_RELAY_5 0x20

// relay controllers

#define TURN_ON  true
#define TURN_OFF false

// relay codes

#define RELAY_1 1
#define RELAY_2 2
#define RELAY_3 3
#define RELAY_4 4
#define RELAY_5 5

void voiceModBegin()
{
  Serial.write(0xAA);
  Serial.write(0x37);
  delay(1000);
  Serial.write(0xAA);
  Serial.write(0x21);
}

void getVoice()
{
  while(Serial.available())
  {
    char vData = Serial.read();
    switch(vData)
    {
      case TURN_ON_RELAY_1:
        sendCommand(TURN_ON, RELAY_1);
        break;
      case TURN_OFF_RELAY_1:
        sendCommand(TURN_OFF, RELAY_1);
        break;
        
      case TURN_ON_RELAY_2:
        sendCommand(TURN_ON, RELAY_2);
        break;
      case TURN_OFF_RELAY_2:
        sendCommand(TURN_OFF, RELAY_2);
        break;
        
      case TURN_ON_RELAY_3:
        sendCommand(TURN_ON, RELAY_3);
        break;
      case TURN_OFF_RELAY_3:
        sendCommand(TURN_OFF, RELAY_3);
        break;
        
      case TURN_ON_RELAY_4:
        sendCommand(TURN_ON, RELAY_4);
        break;
      case TURN_OFF_RELAY_4:
        sendCommand(TURN_OFF, RELAY_4);
        break;
      
      case TURN_ON_RELAY_5:
        sendCommand(TURN_ON, RELAY_5);
        break;
      case TURN_OFF_RELAY_5:
        sendCommand(TURN_OFF, RELAY_5);
        break;
    }
    
  }
}
