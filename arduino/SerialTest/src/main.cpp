#include <Arduino.h>

uint32_t rx_movement = 0;
uint8_t rx_index = 0;
char rx_data[4];
const uint8_t rx_message_len = 4;

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial1.begin(115200);
  delay(1000);

  Serial.println("Serial initiated");
  delay(1000);

  Serial.println("Starting");
  pinMode(LED_BUILTIN, OUTPUT);

  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  Serial.println("test");
}

void loop()
{
  // put your main code here, to run repeatedly:
  /*
  if (Serial1.available())
  {
    digitalWrite(LED_BUILTIN, HIGH);
    char rx_byte = Serial1.read();
    Serial.println(rx_byte);
  }

  */
  if (Serial1.available())
  {
    char rx_byte = Serial1.read();
    rx_data[rx_index] = rx_byte;

    rx_movement += (rx_byte << (8 * rx_index));
    rx_index++;
    if (rx_index == rx_message_len)
    {
      char buffer[50];
      sprintf(buffer, "Received: %lu", rx_movement);
      Serial.print(buffer);
      // TODO: Send rx_movement til span her
      rx_index = 0;
    }
  }
}