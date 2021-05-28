#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#define REFRESH_RATE 1000
#define ID "1606896492778"     // user defined
#define STRING_NPOS 4294967295
#define DATA_SIZE 8

// TODO close the hotspot

const char INETIAL_VECTOR = '_';


String host = "http://192.168.8.101:3000/";
const char *ssid = "SOULY";     // user defined
const char *password = "souly@1200757557";   // user defined


String buff[DATA_SIZE];
String tempBuff[2];
String state[DATA_SIZE];
String value[DATA_SIZE];
String response = "";


int pinName[] = {
 2, 4, 5, 12, 13, 14
};
void setup() {
  
  ESP.wdtDisable();
  hw_wdt_disable();
  Serial.begin(115200);
  connectToWIFI(ssid, password);
  initProgram();
  
}
void hw_wdt_disable(){
  *((volatile uint32_t*) 0x60000900) &= ~(1); // Hardware WDT OFF
}

void hw_wdt_enable(){
  *((volatile uint32_t*) 0x60000900) |= 1; // Hardware WDT ON
}

void loop() {
 runProgram();
 //testFlash();
}
