export enum PlayerStat {
    Pace = "Pace",
    Shooting = "Shooting",
    Passing = "Passing",
    Defense = "Defense",
    Dribble = "Dribble",
    Header = "Header",
    Physique = "Physique",
}

export enum ShotResult {
    GoalKick = 'Out (Goal Kick)',
    TopBar = 'Top Bar',
    RightBar = 'Right Bar',
    LeftBar = 'Left Bar',
    OnTarget = 'On Target',
    Corner = 'Corner',
}

export enum DeflectionResult {
    Out = 'Out of closest line',
    TopLeft = 'Top Left',
    Top = 'Top',
    TopRight = 'Top Right',
    Left = 'Left',
    NoDeflection = 'No deflection (distance 0)',
    Right = 'Right',
    BottomLeft = 'Bottom Left',
    Bottom = 'Bottom',
    BottomRight = 'Bottom Right',
    Corner = 'Corner',
    Goal = 'Goal',
}

export enum DeflectionType {
    LooseBall = 'Loose ball',
    RightBar = 'Right bar',
    LeftBar = 'Left bar',
    TopBar = 'Top bar',
}


export enum BlockResultType {
    HandBall = "Hand Ball",
    LossOfBalance = "Loss of Balance",
    Injury = "Injury",
    BallToShooter = "Ball to Shooter",
    Corner = "Corner",
    ThrowIn = "ThrowIn",
    HeadedClearance = "Headed Clearance",
    Deflection =  "Deflection",
    BallToGoalkeeper = "Ball to Goalkeeper",
    ControlledBall = "Controlled Ball",
    GetAction = 'Gain Action Token',
    Failed = 'Failed',
}
