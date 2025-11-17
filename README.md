Shalev Issachar — Portfolio (Apple-like style)


How to build with Docker (included):
1. Build the image:
docker build -t shalev-portfolio:latest .
2. Run the container (port 80):
docker run --rm -p 80:80 shalev-portfolio:latest


Or using docker-compose:
docker-compose up --build


This project includes dark mode, glass UI, 3D hover effects, animations and Docker support.