/*
   DebugATCommandsSARA sketch

   This sketch is modified from SerialSARAPassthrough.

   The sketch allows you to send 15 basic AT commands from the USB CDC serial port
   of the MKR NB 1500 board to the onboard ublox SARA-R410 celluar module.

   If you want to add more commands the list of supported AT commands are found here:
   https://www.u-blox.com/sites/default/files/u-blox-CEL_ATCommands_%28UBX-13002752%29.pdf

   Circuit:
   - MKR NB 1500 board
   - Antenna
   - 1500 mAh or higher lipo battery connected recommended
       - USB seems to have enough power (tested with my PC)
   - SIM card

   Make sure the Serial Monitor's line ending is set to "Both NL and CR"

   create 26 February 2019
   Tomi Sarajisto
*/

// baud rate used for both Serial ports
unsigned long baud = 115200;
char command;
//#define SerialSARA Serial1

void setup() {
  // reset the ublox module
  pinMode(SARA_RESETN, OUTPUT);
  digitalWrite(SARA_RESETN, HIGH);
  delay(100);
  digitalWrite(SARA_RESETN, LOW);

  Serial.begin(baud);
  SerialSARA.begin(baud);

  while (!Serial) {}
  delay(1000);
  Serial.println("Startig debug program");
}

void loop() {
  if (Serial.available()) {
    command = Serial.read();
    switch (command)
    {
      case '0':
        Serial.println("m: Set verbose error resultcodes");
        SerialSARA.println("AT+CMEE=2");
        break;
      case '1':
        Serial.println("1: Check IMEI");
        SerialSARA.println("AT+GSN");
        break;
      case '2':
        Serial.println("2: Check IMSI");
        SerialSARA.println("AT+CIMI");
        break;
      case '3':
        Serial.println("3: Check RAT type config");
        SerialSARA.println("AT+URAT?");
        break;
      case '4':
        Serial.println("4: Check band configuration");
        SerialSARA.println("AT+UBANDMASK?");
        break;
      case '5':
        Serial.println("5: Check signal");
        SerialSARA.println("AT+CSQ");
        break;
      case '6':
        Serial.println("6: Check APN configuration");
        SerialSARA.println("AT+CGDCONT?");
        break;
      case '7':
        Serial.println("0: Check network");
        SerialSARA.println("AT+COPS?");
        break;
      case '8':
        Serial.println("a: Check all available networks (takes long time)");
        SerialSARA.println("AT+COPS=?");
        break;
      case '9':
        Serial.println("j: Define PDP context");
        SerialSARA.println("AT+CGDCONT=1,\"IP\",\"lpwa.telia.iot\"");
        break;
      case 'a':
        Serial.println("k: Activate PDP context 1");
        SerialSARA.println("AT+CGACT=1,1");
        break;
      case 'b':
        Serial.println("i: Show address of the PDP contexts");
        SerialSARA.println("AT+CGPADDR");
        break;
      case 'c':
        Serial.println("n: Open UDP socket");
        SerialSARA.println("AT+USOCR=17");
        break;
      case 'd':
        Serial.println("o: Send packet to Ublox's echo server ");
        SerialSARA.println("AT+USOST=0,\"echo.u-blox.com\",13,16,\"16 bytes of data\"");
        break;
      case 'e':
        Serial.println("p: Read data from UDP socket");
        SerialSARA.println("AT+USORF=0,26");
        break;
      case 'f':
        Serial.println("g: Display current configuration");
        SerialSARA.println("AT&V");
        break;

        // add your own AT commands

    }

  }

  if (SerialSARA.available()) {
    Serial.write(SerialSARA.read());
  }

}