void splitString(String block, char delimiter, String buff[]){
  char index = 0;
  size_t pos = 0;
  String token;
  while ((pos = block.indexOf(delimiter)) != STRING_NPOS) {
    token = block.substring(0, pos);
    buff[index++] = token;
    block.remove(0, pos + 1);
  }
  buff[index++] = block;
}


void extractData(String buff[])
{
  for(int i = 0; i < DATA_SIZE; i++)
  {
    if(buff[i] == "") break;
    else
    {
      splitString(buff[i], ':', tempBuff);
      state[i] = tempBuff[0];
      value[i] = tempBuff[1];
    }
  }
}

String compineData (String state[], String value[], String id) {
  String stringNodeData = "";
  for (int i = 0; i < DATA_SIZE; i++) 
  {
    if(buff[i] == "") break;
    else
    {
      stringNodeData += state[i] + ":" + value[i] + "&";
    }
  }
  Serial.println(stringNodeData);
  return stringNodeData;
}

void printBuff(String buff[])
{
  Serial.println("buffer : ");
  for(int i = 0; i < DATA_SIZE; i++)
  {
    if(buff[i] == "") break;
    else Serial.println(buff[i]);
  }
}

void printTwoBuffs(String state[], String value[])
{
Serial.println("state : value");
  for(int i = 0; i < DATA_SIZE; i++)
  {
    if(state[i] == "") break;
    else 
    {
      Serial.print(state[i]);
      Serial.print("=");
      Serial.println(value[i]);
    }
  }
}
String valToStr(bool flag)
{
  return flag? "HIGH":"LOW";
}

bool strToVal(String flag)
{
  return flag == "HIGH";
}
