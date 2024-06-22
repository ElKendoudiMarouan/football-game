import {BlockResultChartElement} from '../types/types';
import {BlockResultType, PlayerStat} from './enums';

export const blockResults: Record<number, BlockResultChartElement> = {
    1: {
        title: "Hand Ball",
        text: "A defender blocks a shot with their hand, resulting in a penalty for the opposing team.",
        results: [{ type: BlockResultType.HandBall }],
    },
    2: {
        title: "Loss of Balance",
        text: "The defender loses balance, possibly due to a mistimed slide tackle, leading to a scoring opportunity for the opposition.",
        results: [
            { type: BlockResultType.LossOfBalance, threshold: 5, statName: PlayerStat.Physique },
            { type: BlockResultType.Failed }
        ],
    },
    3: {
        title: "Injury During Play",
        text: "The defender sustains an injury while attempting to block or clear the ball, creating a defensive weakness.",
        results: [
            { type: BlockResultType.Injury, threshold: 4, statName: PlayerStat.Physique },
            { type: BlockResultType.Failed }
        ],
    },
    4: {
        title: "Rebound to Attacker",
        text: "The defender blocks the ball, but it rebounds back to the attacker's feet, giving them another chance to shoot.",
        results: [{ type: BlockResultType.BallToShooter }],
    },
    5: {
        title: "Conceding a Corner",
        text: "The defender's attempt to clear the ball results in a corner kick for the opposing team.",
        results: [{ type: BlockResultType.Corner }],
    },
    6: {
        title: "Headed Clearance",
        text: "The defender uses their head to clear the ball away from the goal area, neutralizing the threat.",
        results: [
            { type: BlockResultType.HeadedClearance, threshold: 4, statName: PlayerStat.Header  },
            { type: BlockResultType.LossOfBalance, threshold: 3, statName: PlayerStat.Physique },
            { type: BlockResultType.Deflection },
            ],
    },
    7: {
        title: "Conceding a Throw-In",
        text: "The defender's attempt to clear the ball results in a throw-in for the opposing team.",
        results: [{ type: BlockResultType.ThrowIn }],
    },
    8: {
        title: "Sliding save",
        text: "The defender attempts a slide to block the ball, but may end up falling.",
        results: [
            { type: BlockResultType.Deflection },
            { type: BlockResultType.LossOfBalance, threshold: 4, statName: PlayerStat.Physique }
        ],
    },
    9: {
        title: "Header save",
        text: "The defender attempts to block the ball with his head, allowing for an effective clearance.",
        results: [
            { type: BlockResultType.HeadedClearance, threshold: 4, statName: PlayerStat.Header },
            { type: BlockResultType.Deflection }
        ],
    },
    10: {
        title: "Mishap in Slide save",
        text: "The defender attempts a slide tackle but falls, creating a scoring opportunity for the opposition.",
        results: [
            { type: BlockResultType.LossOfBalance, threshold: 6, statName: PlayerStat.Physique },
            { type: BlockResultType.Injury, threshold: 5, statName: PlayerStat.Physique }
        ],
    },
    11: {
        title: "Ball to Goalkeeper",
        text: "The defender deflects or directs the ball safely into the goalkeeper's hands.",
        results: [
            { type: BlockResultType.BallToGoalkeeper },
            { type: BlockResultType.LossOfBalance, threshold: 3, statName: PlayerStat.Physique }
        ],
    },
    12: {
        title: "Interception and Counter",
        text: "The defender intercepts the ball and initiates a counter-attack, turning defense into offense effectively.",
        results: [
            { type: BlockResultType.ControlledBall },
            { type: BlockResultType.GetAction }
        ],
    },
};
