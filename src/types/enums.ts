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
    TopLeft = 'Top Left (Cell 3)',
    Top = 'Top (Cell 4)',
    TopRight = 'Top Right (Cell 5)',
    Left = 'Left (Cell 6)',
    NoDeflection = 'No deflection (Cell 7)',
    Right = 'Right (Cell 8)',
    BottomLeft = 'Bottom Left (Cell 9)',
    Bottom = 'Bottom (Cell 10)',
    BottomRight = 'Bottom Right (Cell 11)',
    Corner = 'Corner',
    Goal = 'Goal',
}

export enum DeflectionType {
    LooseBall = 'Loose ball',
    RightBar = 'Right bar',
    LeftBar = 'Left bar',
    TopBar = 'Top bar',
}


export enum OutcomeResultType {
    //Block
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

    //FOUL
    Failed = 'Failed',
    RedCard = 'Red Card',
    YellowCard = 'Yellow Card',
    Foul = 'Foul',
    Penalty = 'Penalty',
    FreeKick = 'Free Kick',
    NoFoul = 'No Foul',
}
