// include the NB library
#include <MKRNB.h>

#include "arduino_secrets.h"
// Please enter your sensitive data in the Secret tab or arduino_secrets.h
// PIN Number
const char PINNUMBER[] = SECRET_PINNUMBER;

// initialize the library instances
NB nbAccess;
NB_SMS sms;

String message;
String ledON = "ON";
String ledOFF = "OFF";

// Array to hold the number a SMS is retrieved from
char senderNumber[20];

void setup() {
  // initialize serial communications and wait for port to open:
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

  for (int i = 0; i < 30; i++) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100);
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
  }
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  delay(3000);

  Serial.println("SMS LED ON/OFF");

  // connection state
  bool connected = false;

  Serial.println("Trying to connect to NB");

  // Start NB connection
  while (!connected) {
    if (nbAccess.begin(PINNUMBER) == NB_READY) {
      connected = true;
    } else {
      Serial.println("Not connected");
      delay(1000);
    }
  }

  Serial.println("NB initialized");
  Serial.println("Waiting for messages");
  Serial.println();
}

void loop() {
  int c;

  // If there are any SMSs available()
  if (sms.available()) {
    Serial.println("Message received from:");

    // Get remote number
    sms.remoteNumber(senderNumber, 20);
    Serial.println(senderNumber);

    Serial.print("Message: ");
    // Read message bytes and print them
    while ((c = sms.read()) != -1) {
      Serial.print((char)c);

      //print incoming message to the "message" string
      message += (char)c;
    }

    //print empty line to separate incoming message from LED status message
    Serial.println();

    //if incoming message is exactly "ON", turn on LED
    if (message.equals(ledON)) {
      digitalWrite(LED_BUILTIN, HIGH);
      Serial.println("LED: ON");
      
      sms.beginSMS(senderNumber);
      sms.print("LED has been turned ON!");
      sms.endSMS();
      Serial.println("Reply sent!");
    }

    //if incoming message is exactly "OFF", turn off LED
    else if (message.equals(ledOFF)) {
      digitalWrite(LED_BUILTIN, LOW);
      Serial.println("LED: OFF");
      
      sms.beginSMS(senderNumber);
      sms.print("LED has been turned OFF!");
      sms.endSMS();
      Serial.println("Reply sent!");
    }

    Serial.println("\nEND OF MESSAGE");

    // Delete message from modem memory
    sms.flush();

    // Clear message string
    message = "";
    Serial.println("MESSAGE DELETED");
    Serial.println();
  }

  delay(1000);
  Serial.println("Waiting...");  

}
