#define RELAY_1 32
#define RELAY_2 33
#define RELAY_3 25
#define RELAY_4 26
#define RELAY_5 27


void relaysbBegin()
{
  pinMode(RELAY_1, OUTPUT);
  pinMode(RELAY_2, OUTPUT);
  pinMode(RELAY_3, OUTPUT);
  pinMode(RELAY_4, OUTPUT);
  pinMode(RELAY_5, OUTPUT);
}

void output(String Data){
  char relData = Data[0];
  digitalWrite(RELAY_1, getState(relData, 0));
  digitalWrite(RELAY_2, getState(relData, 1));
  digitalWrite(RELAY_3, getState(relData, 2));
  digitalWrite(RELAY_4, getState(relData, 3));
  digitalWrite(RELAY_5, getState(relData, 4));
}

bool getState(char relData, uint8_t bitNomber){
  return (relData >> bitNomber) & 1;
}
