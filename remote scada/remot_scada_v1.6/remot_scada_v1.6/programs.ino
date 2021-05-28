void runProgram()
{
  String msg = sendGetRequest(host, response);
  String data = cbcDec(msg);
  splitString(data, '&', buff);
  extractData(buff);
  applyChanges(state, value);
  response = compineData(state, value,(String)ID);
}

void initProgram()
{
  String msg = sendGetRequest(host, response);
  String data = cbcDec(msg);
  splitString(data, '&', buff);
  extractData(buff);
  printTwoBuffs(state, value);
  pinInit(state);
  response = compineData(state, value,(String)ID);
}
