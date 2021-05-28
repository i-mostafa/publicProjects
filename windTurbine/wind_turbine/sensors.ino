int getTemp()
{
  int val = analogRead(3);
  int mv = ( val/1024.0)*5000;
  temp = mv/10;
  
}

int getWindDir(){
  windAngle = map(analogRead(A1), 0, 1024, 0, 360);
}
