String cbcDec(String msg)
{
  String dec = "";
  dec += (char)(msg[0] ^ INETIAL_VECTOR);
  int length = msg.length();
  for (int i = 1; i < length; i++) {
    dec +=(char)( msg[i] ^ msg[i - 1]);
  }
  //Serial.print("decreptedMessage: ");
  //Serial.println(dec);
  return dec;
}

String cbcEnc(String msg)
{
  String enc = "";
  enc += (char)(msg[0] ^ INETIAL_VECTOR);
  int length = msg.length();
  for (int i = 1; i < length; i++) {
    enc +=(char)( msg[i] ^ enc[i - 1]);
  }
  //Serial.print("encreptedMessage: ");
  //Serial.println(enc);
  return enc;
}
