import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersTypeOrmRepository } from './users-typeorm.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { Providers } from '@app/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateGoogleUserDto } from './dto/create-google-user.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersTypeOrmRepository;

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
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersTypeOrmRepository, // getRepositoryToken(User)
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            findOneBy: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersTypeOrmRepository>(
      UsersTypeOrmRepository,
    );
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('usersRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('createUser', () => {
    jest
      .spyOn(bcryptjs, 'hash')
      .mockImplementation((s: string, salt: number | string) => 'hashed123');

    it('should call usersRepository.findOneBy with correct params', async () => {
      await service.createUser(mockUserData);
      expect(usersRepository.findOneBy).toHaveBeenCalledWith({
        email: mockUserData.email,
      });
    });

    it('should call hash correctly', async () => {
      await service.createUser(mockUserData);
      expect(bcryptjs.hash).toHaveBeenCalledWith(mockUserData.password, 10);
    });

    it('should call usersRepository.create with correct params', async () => {
      await service.createUser(mockUserData);
      expect(usersRepository.create).toHaveBeenCalledWith({
        ...mockUserData,
        password: bcryptjs.hash(mockUserData.password, 10),
      });
    });
    it('should create a new user with hashed password', async () => {
      jest.spyOn(usersRepository, 'create').mockReturnValue(mockFullUserData);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation((data) => Promise.resolve(data as User));
      const result = await service.createUser(mockUserData);
      expect(usersRepository.findOneBy).toHaveBeenCalledWith({
        email: mockUserData.email,
      });

      expect(bcryptjs.hash).toHaveBeenCalledWith(mockUserData.password, 10);

      expect(usersRepository.save).toHaveBeenCalled();

      expect(result.password).toBe('hashed123');
    });

    it('should throw ForbiddenException if user exists', async () => {
      jest
        .spyOn(usersRepository, 'findOneBy')
        .mockReturnValue(Promise.resolve(mockFullUserData));

      await expect(service.createUser(mockUserData)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('createGoogleUser', () => {
    it('should call usersRepository.create with correct params', async () => {
      await service.createGoogleUser(mockGoogleUserData);
      expect(usersRepository.create).toHaveBeenCalledWith(mockGoogleUserData);
    });

    it('should create a google user', async () => {
      jest.spyOn(usersRepository, 'create').mockReturnValue(mockFullGoogleUserData);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation((data) => Promise.resolve(data as User));
      const result = await service.createGoogleUser(mockGoogleUserData);
      expect(usersRepository.save).toHaveBeenCalled();
      expect(result.email).toBe('cbryan@uci.edu');
      expect(result.password).toBe('');
    });
  });

  describe('getUser', () => {
    const mockQuery: FindOneOptions<User> = {
      where: {
        id: 'abc1234',
      },
    };

    it('should call usersRepository.findOne with correct query', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockReturnValue(Promise.resolve(mockFullUserData));
      await service.getUser(mockQuery);
      expect(usersRepository.findOne).toHaveBeenCalledWith(mockQuery);
    });
    it("should throw NotFoundException if user doesn't exist", async () => {
      await expect(service.getUser(mockQuery)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return the user with correct id from query', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockReturnValue(Promise.resolve(mockFullUserData));
      const result = await service.getUser(mockQuery);
      expect(result.email).toBe('cbryan@gmail.com')
    })
  });

  describe('getGoogleUser', () => {
    const googleId = 'abc1234google'
    it('should call usersRepository.findOne with correct query', async () => {
      jest
        .spyOn(usersRepository, 'findOneBy')
        .mockReturnValue(Promise.resolve(mockFullGoogleUserData));
      await service.getGoogleUser(googleId);
      expect(usersRepository.findOneBy).toHaveBeenCalledWith({
        googleId,
      });
    });
    it("should throw NotFoundException if user doesn't exist", async () => {
      await expect(service.getGoogleUser(googleId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return the user with correct id from query', async () => {
      jest
        .spyOn(usersRepository, 'findOneBy')
        .mockReturnValue(Promise.resolve(mockFullGoogleUserData));
      const result = await service.getGoogleUser(googleId);
      expect(result.email).toBe('cbryan@uci.edu')
    })
  })
  
  describe('getUsers', () => {
    it('should call usersRespository.findAll with empty query param', async () => {
        await service.getUsers()
        expect(usersRepository.findAll).toHaveBeenCalledWith({});
    })

    it('should return a list of users', async () => {
      jest.spyOn(usersRepository, 'findAll').mockReturnValue(Promise.resolve([mockFullGoogleUserData, mockFullUserData]))

      const result = await service.getUsers()
      expect(usersRepository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(2);
    })

    it('should return an empty list', async () => {
      jest.spyOn(usersRepository, 'findAll').mockReturnValue(Promise.resolve([]))

      const result = await service.getUsers();
      expect(usersRepository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(0);
    })
  })
  describe('updateUser', () => {
    const mockQuery: FindOneOptions<User> = {
      where: {
        id: 'abc1234',
      },
    };
    it('should call updateUser with corret data', async () => {

    })
  })
});
