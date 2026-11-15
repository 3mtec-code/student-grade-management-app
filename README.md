# Student Grade Management App

A mobile application built with Expo React Native for the Mobile Application Development individual assignment.

## Features
- Enter student ID and name (TextInput)
- Select gender (Radio buttons)
- Select a course (Picker)
- Select two continuous assessments and the Final exam (Checkboxes)
- Enter continuous and final scores (TextInput)
- Calculate total score out of 100 and the final grade
- Display ID, name, gender, course, assessments, score and grade

## JavaScript concepts used
- **Array:** stores the selected assessments
- **Function:** `calculateGrade()` computes the total and grade
- **Conditional statements:** if / else if / else assign the grade

## Grading scale
| Score | Grade |
|-------|-------|
| 90+ | A+ |
| 85-89 | A |
| 80-84 | A- |
| 75-79 | B+ |
| 70-74 | B |
| 65-69 | B- |
| 60-64 | C+ |
| 50-59 | C |
| 45-49 | C- |
| 40-44 | D |
| Below 40 | F |

## Packages
- expo
- @react-native-picker/picker
- expo-checkbox

## How to run
```bash
npm install
npx expo start
```

## Build APK
```bash
eas build -p android --profile preview
```

## Author
Mebratu Muhabaw
