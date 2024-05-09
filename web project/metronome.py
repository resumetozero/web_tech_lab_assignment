import pygame
import time
import numpy

pygame.init()

frequency = 440 #hz
interval =[]

clock = pygame.time.Clock()
duration_interval=None
beep_on = False
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_m:
                interval.appned(time.time())
                
                if len(interval) >= 4:
                    duration_interval = float(numpy.average(interval))
            # If the "x" key is pressed, stop the cycle
            elif event.key == pygame.K_x:
                running = False

    if duration_interval is not None and beep_on:
        pygame.mixer.Sound(frequency).play()
        time.sleep(duration_interval)

    # Limit frame rate
    clock.tick(30)

# Quit Pygame
pygame.quit()
