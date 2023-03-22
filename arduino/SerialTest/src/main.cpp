#include <Arduino.h>

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial1.begin(115200);
  delay(1000);

  Serial.println("Serial initiated");
}

void loop()
{
  // put your main code here, to run repeatedly:
  if (Serial1.available())
  {
    String rx_string = Serial1.readString();
    Serial.println(rx_string);
    // TODO: send rx_string to span
  }
}