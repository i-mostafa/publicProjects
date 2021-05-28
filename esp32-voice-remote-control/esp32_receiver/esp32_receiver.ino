#include <WiFi.h>
#include <HTTPClient.h>

#define INTERVAL 2000

const char* ssid     = "ssid";
const char* password = "password";

const char* host = "http://192.168.4.1/data";
unsigned long previousMillis = 0;

String Data;

void setup(){
  relaysbBegin();
  connectToWIFI(ssid, password);
}

void loop()
{
  getData();
}
