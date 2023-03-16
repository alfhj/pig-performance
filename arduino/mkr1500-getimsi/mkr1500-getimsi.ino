/*
   SerialSARAPassthrough sketch

   This sketch allows you to send AT commands from the USB CDC serial port
   of the MKR NB 1500 board to the onboard ublox SARA-R410 cellular module.

   For a list of supported AT commands see:
   https://www.u-blox.com/sites/default/files/u-blox-CEL_ATCommands_%28UBX-13002752%29.pdf

   Circuit:
   - MKR NB 1500 board
   - Antenna
   - SIM card

   Make sure the Serial Monitor's line ending is set to "Both NL and CR" or "Carriage Return"

   created 11 December 2017
   Sandeep Mistry
*/

// baud rate used for both Serial ports
unsigned long baud = 115200;

void write(char* command) {
  SerialSARA.println(command);
  delay(2000);
  while (!SerialSARA.available()) {}
  while (SerialSARA.available()) {
    Serial.write(SerialSARA.read());
  }
}

void setup() {
  // NEVER EVER use RESET_N
  pinMode(SARA_RESETN, OUTPUT);
  digitalWrite(SARA_RESETN, LOW);

  // Send Poweron pulse
  pinMode(SARA_PWR_ON, OUTPUT);
  digitalWrite(SARA_PWR_ON, HIGH);
  delay(150);
  digitalWrite(SARA_PWR_ON, LOW);

  Serial.begin(baud);
  SerialSARA.begin(baud);

  while (!Serial) {}

  delay(2000);
  Serial.println("Inputting PIN:");
  write("AT+CPIN=\"1111\"");
  Serial.println();
  
  delay(2000);
  Serial.println("Getting IMEI:");
  write("AT+GSN");
  Serial.println();
  
  delay(2000);
  Serial.println("GETTING IMSI:");
  write("AT+CIMI");
  Serial.println();
}

void loop() {}
