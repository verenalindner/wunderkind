// Arduino code for Neopixel LED controller
// using a potentiometer and switch button
// (C) Ismail Uddin, 2015
// www.scienceexposure.com

#include <Adafruit_NeoPixel.h>
#define PIN 3
Adafruit_NeoPixel strip = Adafruit_NeoPixel(24, PIN, NEO_GRB + NEO_KHZ800);

int buttonPin1 = 9;
int buttonPin2 = 6;
int buttonState1 = 0;
int buttonState2 = 0;
int potPin = 2;

int val = 0;
int reading = 0;
int x;
int prevVal = 0;
int t;
int potValue = 0;

float alpha = 0.2;
int ema_s = 0;
int prev=0;

void setup() {
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
  strip.begin();
  strip.show();
  
}

void loop() {

  buttonState1 = digitalRead(buttonPin1);
  buttonState2 = digitalRead(buttonPin2);
  reading = analogRead(potPin);

  reading = (alpha*reading) + ((1-alpha)*prev);
  prev=reading;
  val = (reading/1024.0) * 25;

  if ((buttonState1 && buttonState2) == HIGH) {
    strip.setBrightness(40);
    
      for ( x = 0; x < val; x++) 
      {
       strip.setPixelColor(x,255,0,150);
       t=x-1;
       strip.setPixelColor(t, strip.Color(222,222,222));
       
      }
      for (x=val; x<25; x++) 
      { 
        strip.setPixelColor(x,0,0,0);
        strip.show();
      }
  }

  if ((buttonState1 && buttonState2) == LOW) {

      potValue = val-1; // THIS IS THE VALUE FOR YOU SUBBU :D

      strip.setPixelColor(potValue,0,0,250);

      if (potValue < 12) {
        strip.setPixelColor(potValue+12,0,0,250);
      }
      if (potValue >= 12) {
        strip.setPixelColor(potValue-12,0,0,50);
      }
        
      strip.show();
      /*
      for (x=0; x<strip.numPixels(); x++) 
      { 
        strip.setPixelColor(x,0,150,0);
        strip.show();
      }*/
  }
    
}
