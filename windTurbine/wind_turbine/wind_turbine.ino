#include <Servo.h>
#define TURBINE_PIN 10

Servo turbine;

String inputString = "";         
bool stringComplete = false;
int temp = 0, windAngle = 0, turbineAngle = 0, currentAngle = 0;
long timer = 0;
char mode = 'A';
void setup() { 
  Serial.begin(9600);
  inputString.reserve(100);
  Serial.println("{\"msg\":\"hi Node\"}");
  turbine.attach(TURBINE_PIN);
 
}

void loop() 
{ 
  moveServo();
  if(mode == 'A')
  {
    turbineAngle = windAngle;
  }
  if (stringComplete) 
  {
    if(inputString[0] == 'A') {
      mode = 'A';
    }
    else if(inputString[0] == 'M') mode = 'M';
    else turbineAngle =map(inputString.toInt(),0, 360, 0, 180);
    inputString = "";
    stringComplete = false;
   } 
  getTemp();
  getWindDir();
  if(millis() - timer > 1000)
    sendData();
}
