# 1. נשתמש באימג' המלא והיציב של Node (מבוסס Debian, כולל את כל תלויות המערכת)
FROM node:20

# 2. נגדיר את תיקיית העבודה בתוך הקונטיינר
WORKDIR /usr/src/app

# 3. נעתיק קודם כל את קבצי ה-package כדי לנצל את ה-Cache של דוקר להתקנות
COPY package*.json ./

# 4. נתקין את ה-dependencies ישירות בתוך הלינוקס של דוקר
RUN npm install

# 5. נעתיק את שאר קבצי הפרויקט (ה-.dockerignore ימנע מה-node_modules של ווינדוס להיכנס)
COPY . .

# 6. נחשוף את הפורט שהאפליקציה רצה עליו
EXPOSE 8080

# 7. הרצה ישירה של קובץ השרת (עדיף בקונטיינרים על פני npm start)
CMD ["node", "server.js"]