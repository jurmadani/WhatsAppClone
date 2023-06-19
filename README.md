# WhatsApp Clone

<img src="/assets/read-me-assets/cover.png" align="left">

This project is an WhatsApp clone developed using React Native and TypeScript. It includes features such as user authentication/registration, adding contacts, account editing, send messages/images, all in REAL TIME. The project also utilizes Redux for global state management and Firebase for backend services, including Firebase Storage for storing media files, Firestore for the database.

## 🔗 Developer

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-jurma/)



## Key Features

- User Authentication: User Authentication: login & sign-up via firebase.
- Real-time Messaging: Send and receive messages in real-time, creating a seamless chatting experience similar to WhatsApp.
- Account Management: Edit profile information and update profile picture.
- Contact Management: Add and manage contacts to easily connect with friends and family.
- Media Sharing: Share photos and other media files from the device gallery with contacts..
- Notifications: Implement push notifications to alert users about new messages and updates.
- Seen Message System: Users can see if they're message was seen by the ther contact.
- UI Design: Modern UI with Ui Kitten, React Native Elements, and React Native Paper.
- State Management: Efficient state management with Redux.

## Technologies Used

<img src="/assets/read-me-assets/rn.png"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/typescript.png"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/redux.png"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/git.png"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/npm.png"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/firebase.png"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/vscode.png"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/figma.png"
width="200" hspace="10" vspace="10">


- **React Native**: Popular open-source JavaScript framework for cross-platform mobile app development.
- **Typescript**: Superset of JavaScript with optional static typing for improved code quality and tooling.
- **Redux**: Predictable state container for managing application state in JavaScript apps.
- **Git**: Version control system for tracking code changes and facilitating collaboration.
- **npm**: JavaScript package manager for easy dependency management.
- **Firebase**: A comprehensive backend-as-a-service (BaaS) platform provided by Google.
- **Visual Studio Code**: Popular code editor with rich features for code editing and debugging.
- **Figma**: Web-based design tool for creating UI/UX designs and prototypes.



## Configuration

Before running the application, you need to configure Firebase services. Follow the steps below:

Create a Firebase project at https://firebase.google.com if you haven't already.
- Enable Firebase Authentication, Firestore, and Firebase Storage for your project.
- Obtain the Firebase configuration object from the Firebase console.
- Update the Firebase configuration in the project code.
- Create a folder "backend" with file firebase.ts and replace the following lines with your Firebase configuration:

```bash
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"
import "firebase/compat/database"

const firebaseConfig = {
 //your config goes here
};

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);

}

export { firebase };

```
    

## Deployment

To deploy this project run

```bash
  npx expo start 
```


## Screnshots

<img src="/assets/read-me-assets/ss1.jpg"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/ss2.jpg"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/ss4.jpg"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/ss5.jpg"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/ss6.jpg"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/ss7.jpg"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/ss8.jpg"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/ss11.jpg"
width="200" hspace="10" vspace="10">
<img src="/assets/read-me-assets/ss13.jpg"
width="200" hspace="10" vspace="10">

## UI Libraries

- **<a href="https://akveo.github.io/react-native-ui-kitten/" target="_blank">UI Kitten</a>**: A customizable UI library for React Native that provides various UI components.
- **<a href="https://reactnativeelements.com/" target="_blank">React Native Elements</a>**: A set of cross-platform UI components for React Native applications.
- **<a href="https://callstack.github.io/react-native-paper/" target="_blank">React Native Paper</a>**:  A material design implementation for React Native, providing UI components and theming options.

## Problem Approach
- Analyzed project requirements and identified specific needs and features for each application.
- Researched and evaluated technologies and frameworks for cross-platform compatibility, performance, and developer experience.
- Set up the development environment and configured necessary tools, libraries, and dependencies.
- Used a modular architecture pattern, separating the code into small, reusable components, to ensure seperation of concerns and efficient testing.
- Used Git for collaboration, code management, and change tracking.

## If time was infinite
 Given infinite time, here are some exciting features I would add to enhance the user experience:
- Group Chat: Foster seamless collaboration and teamwork through group conversations.
- Video/Audio Calls: Enable real-time video and audio calls to connect people across distances.
- Message Reactions: Express emotions and provide quick feedback with message reactions.
- Swipe to Reply: Streamline conversations with an intuitive swipe-to-reply feature.

## Contributing
Whether you use this project, have learned something from it, or just like it, please consider supporting it by buying me a coffee, so I can dedicate more time on building open-source projects like this :)

<a href="https://www.buymeacoffee.com/djurma" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60px" width="217px" />
</a>

## License
The WhatsApp Clone is open-source and released under the [GNU General Public License](https://choosealicense.com/licenses/gpl-3.0/)

## Contact
For any inquiries or questions regarding the WhatsApp Clone application, please contact me at d_jurma@yahoo.com





    
