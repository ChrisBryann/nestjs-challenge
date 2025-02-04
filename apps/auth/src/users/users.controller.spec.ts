import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateGoogleUserDto } from './dto/create-google-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtRmqGuard, Providers } from '@app/common';
import { CanActivate } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserData: CreateUserDto = {
    email: 'cbryan@gmail.com',
    password: 'nice2134',
    firstName: 'Christopher',
    lastName: 'Bryan',
    provider: Providers.None,
  };

  const mockFullUserData: User = {
    ...mockUserData,
    id: 'abc1234',
    googleId: '',
    createdAt: new Date('1/1/2025'),
    updatedAt: new Date('1/2/2025'),
    deletedAt: null,
    password: 'hashed123',
  };

  const mockGoogleUserData: CreateGoogleUserDto = {
    googleId: 'abc1234google',
    firstName: 'Chris',
    lastName: 'Bryan',
    email: 'cbryan@uci.edu',
    provider: Providers.Google,
  };

  const mockFullGoogleUserData: User = {
    ...mockGoogleUserData,
    id: 'abc1234',
    createdAt: new Date('1/1/2025'),
    updatedAt: new Date('1/2/2025'),
    deletedAt: null,
    password: '',
  };

  beforeEach(async () => {
    const mockJwtRmqGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(() =>
              Promise.resolve(mockFullUserData),
            ),
            getUser: jest.fn(),
            getUsers: jest.fn(() => [mockFullUserData, mockGoogleUserData]),
            updateUser: jest.fn(),
            getGoogleUser: jest.fn(),
            createGoogleUser: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtRmqGuard)
      .useValue(mockJwtRmqGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /', () => {
    it('should call service.createUser with correct param', async () => {
      await controller.createUser(mockFullUserData);
      expect(service.createUser).toHaveBeenCalledWith(mockFullUserData);
    });
  });

  describe('GET /', () => {
    it('should call service.getUsers', async () => {
      await controller.getUsers(mockFullUserData);
      expect(service.getUsers).toHaveBeenCalled();
    })
    
    it('should return correct list of users', async () => {
      const result = await controller.getUsers(mockFullUserData);
      expect(result).toHaveLength(2);
    })
  })
});
