#include <iostream>
#include<math.h>
#include<string.h>
#include<stdlib.h>

#define STRING_NPOS 4294967295
#define DATA_SIZE 50
#define MSG_SIZE 200
#define ENCRYPTION_FLAG 96

using namespace std;

string buff[DATA_SIZE];
string tempBuff[2];
string state[DATA_SIZE];
string value[DATA_SIZE];

int x, y, n, t, i, flag;
long int e[50], d[50], temp[MSG_SIZE], j;
char en[MSG_SIZE], m[MSG_SIZE];
string msg = "ANALOG:0&OUTPUT:LOW&INPUT:null&PWM:100&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&INPUT:null&";


void splitString(string block, char delimiter, string buff[]){
    char index = 0;
    size_t pos = 0;
    string token;
    while ((pos = block.find(delimiter)) != STRING_NPOS) {
        token = block.substr(0, pos);
        buff[index++] = token;
        block.erase(0, pos + 1);
    }
    buff[index++] = block;
}
void printBuff(string buff[])
{
    for(int i = 0; i < DATA_SIZE; i++)
    {
        if(buff[i] == "") break;
        else cout<<buff[i]<<endl;
    }
}

void printTwoBuffs(string state[], string value[])
{
    for(int i = 0; i < DATA_SIZE; i++)
    {
        if(buff[i] == "") break;
        else cout<<state[i]<<'='<<value[i]<<endl;
    }
}
void extractData(string buff[])
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

int prime(long int pr)
{
   int i;
   j = sqrt(pr);
   for(i = 2; i <= j; i++)
   {
      if(pr % i == 0)
         return 0;
   }
   return 1;
 }

long int cd(long int a)
{
   long int k = 1;
   while(1)
   {
      k = k + t;
      if(k % a == 0)
         return(k/a);
   }
}


//function to generate encryption key
void encryption_key()
{
   int k;
   k = 0;
   for(i = 2; i < t; i++)
   {
      if(t % i == 0)
         continue;
      flag = prime(i);
      if(flag == 1 && i != x && i != y)
      {
         e[k] = i;
         flag = cd(e[k]);
         if(flag > 0)
         {
            d[k] = flag;
            k++;
         }
         if(k == MSG_SIZE -1)
         break;
      }
   }
}

//function to encrypt the message
void encrypt()
{
   long int pt, ct, key = e[0], k, len;
   i = 0;
   len = strlen(m);
   while(i != len)
   {
      pt = m[i];
      pt = pt - ENCRYPTION_FLAG;
      k = 1;
      for(j = 0; j < key; j++)
      {
         k = k * pt;
         k = k % n;
      }
      temp[i] = k;
      ct= k + ENCRYPTION_FLAG;
      en[i] = ct;
      i++;
   }

   en[i] = -1;
   cout << "\n\nTHE ENCRYPTED MESSAGE IS\n";
   for(i=0; i<=len; i++)
      cout <<en[i];
}

//function to decrypt the message
void decrypt()
{
   long int pt, ct, key = d[0], k;
   i = 0;
   long len = strlen(m);
   while(i != len)
   {
      ct = temp[i];
      k = 1;
      for(j = 0; j < key; j++)
      {
         k = k * ct;
         k = k % n;
      }
      pt = k + ENCRYPTION_FLAG;
      m[i] = pt;
      i++;
   }
   m[i] = -1;
   cout << "\n\nTHE DECRYPTED MESSAGE IS\n";
   for(i = 0; i <= len; i++)
      cout << m[i];

  cout << endl;
}

const char INETIAL_VECTOR = '_';

string cbcDec(string msg)
{
    string dec = "";
    dec += msg[0] ^ INETIAL_VECTOR;
    int length = msg.length();
  for (int i = 1; i < length; i++) {
   dec += msg[i] ^ msg[i - 1];
  }
  cout<<dec;
}

string cbcEnc(string msg)
{
    string enc = "";
    enc += msg[0] ^ INETIAL_VECTOR;
    int length = msg.length();
  for (int i = 1; i < length; i++) {
   enc += msg[i] ^ enc[i - 1];

  }
  cout<<enc<<endl;
}


int main()
{
    splitString(msg, '&', buff);
    printBuff(buff);
    extractData(buff);
    printTwoBuffs(state, value);

  //  x = 7;
  //  y = 13;

   // for(i = 0; msg[i] != NULL; i++)
   //   m[i] = msg[i];
  //  n = x * y;
  //  t = (x - 1) * (y - 1);

   // encryption_key();

  //  cout << "\nPOSSIBLE VALUES OF e AND d ARE\n";

  //  for(i = 0; i < j - 1; i++)
  //    cout << "\n" << e[i] << "\t" << d[i];

//encrypt();
//
  //  decrypt();
    cbcEnc(msg);
    return 0;
}
