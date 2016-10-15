#include <Adafruit_NeoPixel.h>
#define PIN 3
Adafruit_NeoPixel strip = Adafruit_NeoPixel(24, PIN, NEO_GRB + NEO_KHZ800);
int x;
int y;

void setup() {
  // put your setup code here, to run once:
 strip.begin();
 strip.show();
 
}

void loop() {
  // put your main code here, to run repeatedly:

  for(y=10; y<120; y+=5) {
    
  
  strip.setBrightness(y);
  for (x=0; x<25; x++) 
      { 
        strip.setPixelColor(x,245, 171, 53);
        strip.setPixelColor(3,255,0,150);
        strip.show();
      }
   delay(300);
   
   
  }
}
