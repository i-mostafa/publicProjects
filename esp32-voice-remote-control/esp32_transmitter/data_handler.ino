void sendCommand(bool state, uint8_t relayNomber)
{
  int mask = 1 << relayNomber; 
  Data = (Data & ~mask) | ((state << relayNomber) & mask); 
}
