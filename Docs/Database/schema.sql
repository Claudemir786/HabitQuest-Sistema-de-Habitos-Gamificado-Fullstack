CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    name_user VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,

    level INT DEFAULT 1,
    xp INT DEFAULT 0,

    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_completed_date DATE
);

CREATE TABLE User_achievement(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    achievement_id INTEGER NOT NULL,
    unlocked_at DATE,

    UNIQUE(user_id, achievement_id),

    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (achievement_id) REFERENCES Achievement(id)
);


CREATE TABLE Achievement(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
    xp_required INTEGER,
    streak_required INTEGER,
    badge_icon VARCHAR(50) NOT NULL

);

CREATE TABLE Habit(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name_habit VARCHAR(100) NOT NULL,
    user_id INTEGER NOT NULL,
    xp_reward INTEGER NOT NULL,
    active_habit BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Habit_logs(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    habit_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    completed_at DATE NOT NULL,
    xp_earned INTEGER NOT NULL,
    FOREIGN KEY (habit_id) REFERENCES Habit(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
)
