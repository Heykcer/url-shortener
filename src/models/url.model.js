import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../config/db.js';


class url extends Model {}

url.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        longUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shortUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        clicks: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    
    
    }, {
        sequelize,
        modelName: 'url',
        timestamps: true,
        indexes:[
            {fields:['longUrl']},
        ]
    }
);

export default url;