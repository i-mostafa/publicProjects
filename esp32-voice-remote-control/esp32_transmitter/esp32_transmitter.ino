#include <WiFi.h>
#include <ESPAsyncWebServer.h>

#define PORT 80
const char* ssid     = "ssid";
const char* password = "password";

AsyncWebServer  server(PORT);
String header;

char Data = 0x00; //all relays are off 

void setup() {
  Serial.begin(9600);
  voiceModBegin();
  crateHotSpot(ssid, password);
}

void loop() {
  getVoice();
}
