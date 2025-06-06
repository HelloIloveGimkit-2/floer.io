import { ServerEntity } from "./serverEntity";
import { Vector } from "../../../common/src/utils/vector";
import { type EntitiesNetData } from "../../../common/src/net/packets/updatePacket";
import { CircleHitbox, RectHitbox } from "../../../common/src/utils/hitbox";
import { EntityType, GameConstants } from "../../../common/src/constants";
import { Game } from "../game";
import { CollisionResponse } from "../../../common/src/utils/collision";
import { collideableEntity } from "../typings";

export class ServerWall extends ServerEntity<EntityType.Wall> {
    type: EntityType.Wall = EntityType.Wall;

    hitbox: RectHitbox;

    canCollideWith(entity: ServerEntity): boolean {
        return true
    }

    knockback: number = 0;

    constructor(game: Game, min: Vector, max: Vector) {
        super(game, min);
        this.hitbox = new RectHitbox(min, max);
        this.position = min;

        this.game.grid.addEntity(this);
    }

    tick(): void{}

    collideWith(collision: CollisionResponse, entity: collideableEntity) {}

    get data(): Required<EntitiesNetData[EntityType.Wall]>{
        return {
            position: this.hitbox.min,
            max: this.hitbox.max,
            full: {}
        };
    };
}
