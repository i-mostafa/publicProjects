void moveServo(){
  if(currentAngle > turbineAngle)
  {
    //Serial.println(currentAngle);
    turbine.write(currentAngle--);
    delay(20); 
    
  }else if(currentAngle < turbineAngle)
  {
   // Serial.println(currentAngle);
    turbine.write(currentAngle++);
    delay(20); 
  }
}
