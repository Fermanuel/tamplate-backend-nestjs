import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { JwtPayload } from "../interface/jwt-paylot.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        private readonly dbService: DbService ,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    
    
    async validate(payload: JwtPayload) {
        
        const { id } = payload;

        const user = await this.dbService.user.findUnique({
            where: {
                id
            }
        });

        if(!user){
            throw new UnauthorizedException('Token no valido')
        }

        if(!user.IsActive) {
            throw new UnauthorizedException('Usuario no activo')
        }
        
        return user;
    }
}