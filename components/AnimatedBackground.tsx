'use client';

interface AnimatedBackgroundProps {
  occasion: string;
}

export default function AnimatedBackground({ occasion }: AnimatedBackgroundProps) {
  const getAnimationElements = () => {
    switch (occasion) {
      case 'Sinh nhật':
        return (
          <>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    fontSize: `${20 + Math.random() * 30}px`,
                  }}
                >
                  🎂🎈🎁🎉
                </div>
              ))}
            </div>
          </>
        );
      
      case 'Ngày 20/10':
        return (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${25 + Math.random() * 35}px`,
                }}
              >
                🌹🌺💐🌸
              </div>
            ))}
          </div>
        );

      case 'Giáng sinh':
        return (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  fontSize: `${20 + Math.random() * 25}px`,
                }}
              >
                ❄️🎄⭐🎅
              </div>
            ))}
          </div>
        );

      case 'Năm mới':
        return (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${15 + Math.random() * 30}px`,
                }}
              >
                🎆🎇✨🎊
              </div>
            ))}
          </div>
        );

      case 'Tốt nghiệp':
        return (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${25 + Math.random() * 30}px`,
                }}
              >
                🎓📚🏆⭐
              </div>
            ))}
          </div>
        );

      case 'Valentine':
        return (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${20 + Math.random() * 35}px`,
                }}
              >
                💝💕💖💗
              </div>
            ))}
          </div>
        );

      case 'Tết Nguyên Đán':
        return (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(22)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2.5}s`,
                  fontSize: `${20 + Math.random() * 30}px`,
                }}
              >
                🧧🎊🏮🐉
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${20 + Math.random() * 30}px`,
                }}
              >
                ✨🌟💫⭐
              </div>
            ))}
          </div>
        );
    }
  };

  return <div className="pointer-events-none">{getAnimationElements()}</div>;
}
