// Arduino code for Neopixel LED controller
// using a potentiometer and switch button
// (C) Ismail Uddin, 2015
// www.scienceexposure.com

#include <Adafruit_NeoPixel.h>
#define PIN 3
Adafruit_NeoPixel strip = Adafruit_NeoPixel(16, PIN, NEO_GRB + NEO_KHZ800);

int potPin = 2;
int val = 0;
int colorVal = 0;
int reading = 0;
int x;
int prevVal = 0;
int t;


void setup() {
  strip.begin();
  strip.show();

}

void loop() {
  
  reading = analogRead(potPin);
  val = (reading/1024.0) * 17;
  colorVal = (reading/1024.0) * 255;
  
    strip.setBrightness(40);
    //if (val != prevVal)
    //{
      for ( x = 0; x < val; x++) 
      {
       strip.setPixelColor(x,255,0,150);
       t=x-1;
       strip.setPixelColor(t, strip.Color(0,0,0));
      }
      for (x=val; x<17; x++) 
      { 
        strip.setPixelColor(x,222,222,222);
        strip.show();
      }
    
}
