import React from 'react';

// TODO use props to change the color and size
interface Props {
  color?: string;
  size?: string;
}

const WizeLogo = ({ size = '32' }: Props) => {
  return (
    <svg width={size} height={size} viewBox='0 0 32 22' fill={'none'} xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <rect width={size} height={size} fill='url(#pattern0)' />
      <defs>
        <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
          <use href='#image0_75_3116' transform='matrix(0.00818452 0 0 0.0119048 -0.00744048 0)' />
        </pattern>
        <image
          id='image0_75_3116'
          width='124'
          height='84'
          href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAABUCAYAAABA4VPlAAAACXBIWXMAAAsSAAALEgHS3X78AAALd0lEQVR4nO2d/4scZx3HP59BhP50IT8cQpE7bWO+XJtL2jRtWru3lZ4ggj0QBBH0giBCwdwfYOVaBEEEUxBE0HoFEQXBC4ig26aXTdLma5NrE02OWm+wpHTB9jahsZeeu/LMPM8zzzOfZ2Znd+eZZ3bXT3rs3TPP7k6f9/N63s/MfJ4ZbLfb8P8AaFRm5wGgyn8mbDbJZqv1wdrtD2+v3f7w7ubWFjTubAblyP4h8N+jV1bO/5PlyfVR/O4jwgoALD779tq6fM+oC96ozC6wRgGAMbIx5/io1Woe/+Dfn1y9dfMuVaC4mHGRISZo8Eq2hVvUDiDrAhz+wdvXl2CUBW9UZrcBwDIAzJCNFqK5tfX+Czf+tX2z1UoUOXhFpGWKyADq+6jIoFOufs/h7//j+tJICs7FZsPdNNloIZjYv77xzvbNditGsfiddgBRniQyEMolzbGRQdZvIsDkJ4r4Hy5hLBcldqvdvv27925sv9NugcfLuvflJMqTRDZuG0PA+ZETvFGZXSxqGGdx/lbz45tbW4HYOfuyfA+pD4mUz42U4HwoXyAbLMV/2+3/nGtujHlGak3EglFk0EWLjQzJQ7zWeTAsGzXCF4qYjYu4eOvmnY/b7bs8ZczO2ZdjnQP1z0X6+SMjuAu6L9zcGEODyCBFMVGeJLJ5m2mIV0tQ37YhBecnHubJntuLpfF6banA7yuU7nc2P/rrnVZ7m4c4Y9mXlc8ziqzWXw4OyxqV2aMAcITstf04Nl6vzdn+Fk43O9tUlOBNAJgcr9c2nvnMjiUA/JZNX9Y/M3GI94+sXZ30GpXZSUdis3iKjyy2o1C6AeAoExvCRl9gHu5x4Twum5jIiR9PlAWvYX0P9foeFzP4LBT1gR8BiPfo9b2oPjs6Ccomye4WG4s2v61o7+Z0HxV/PPfPtQ0PsKmK7EmRI6FVMVXRUBcNUOkUqsgemuvzz/e/d/1KYJ8eH+pcxoRlyp3RzeK5z+6sspMeqsgRgfEOoFOrii/JB6U+mut7sU6BGEHljddrTPATZLeLDSuUu6YbeGN7CAqxqBCoEq5SjgrNVGTTEB+VR+RjSL7/9LUrcnIszvZZHVYzhC3KndL9w3t2VT1gs3RrvqyNCiHNqInvxbQNBB+v11aGjfIy0M0amxJIfbZHX1aHbCm0/IzwPf53r725FNsnGcNGuVO6f3TvrioizPTry5jsy4rI0eeEnUNSTjSVgg8T5eWgGxfz8GXP7MtaZ6GjQnjc/Z2/v0FObHmxv4eFcqd0//je3SHdlnxZ7zBIR4WQcqOWmuDDQHk5Zua4aNGX1SGbDOViZv7tv60SusFAOAwB5U7p/smOPVUPmHdb8+XI9xWRRWoUr5+oIRF8kCkvhXejmJlb8eVEkcVZO0T0DyfQDSbBeQwq5U7p/unnpqoIOGPRl6XIqIvMOwY97o6HUfBBpLwU3g3hWTV9spY0ZHfty5rIsj6CUh/9b169nEg3JAnOY9Aod0r38zunquzad1zkOLF9+LIUOjonr5x/DwnvqFmi4INEeXmOu6nIlNgkyqnIpiGbUi4vyvjfuHIplW5IE5zHoFDulO6f7byPXRGbyerLpiG7gy/rV9kMlJvOqpkiVfBBoLwsx92UWPOQneTL2hBvEBmF+EpmDEbi+1+/8nqmdLFUwXmkNngB0Ylyp3T/fNf98ri7H1/WOwwV2YuJHBviM2vUUfAyU16mmbklX5YiI9D6nH7/a29moxsyEg5JDV5gJFHulO5f7N4rZ+amITsHX47K49kyEf1daZNJ8LJQzokOoizXuy36stIxDNkyYbn/1TcudpXq3c1CBNaTXiGlxQVbpL/CU6q3uab7l5xu8beWCw6mhQeopBZH5cn1lTRjNJTFctWyRlfLhRuV2ZUiF+KVKGSeudilX+2ZXgkOxfjfCHQ1KMbKIdYBQJx907ahPCsHBpEh2ubPrV7oOuM4q4eLcO3lrkKj+4U903xmrgzjhiG7D1/WZ+valTdZvyctuhK8JF5edFDv5sfdqsimQ6kefVnpANFCBVTrA/hfWT3f0zKtbgmHEaRco/vFqX0B3VmOl02HUqrIUQfQRZZCK98Ru8TaswZdCz5ilFO6g5l5tuNl05CtimwaslGtD8aFCv6XL5/reRFmL4TDCFGu0f2bqf3BzNyiL+tDvHmhQl9t35PgI0I5pZtls9jz5SwLFfwvXeqdbuiDcBgByjW6f3vf/iCbxaIvKx2AZsvwTtF3m/cs+JBTbqAbFy36Mr3KRhMp/C9eOtv3DRT6IRyGmHKN7t/f/wCfmVvzZe0qG0Yiq4kUubR1X4IPKeWUbgjzzC35sp7caL7E6j/5+plcbo/SL+EwhJRrdP9h74NyFYklX+6QkhzdvSGP6FvwIaPcSLdpyM7Jl1NTknmH8Z+4+FpuNz/Kg3AYIso1uv+490CQq2bRl0mCo4HyXNs2F8GHhHJCN/JVJJZ82ZjgKCnna8QqOdINORIOQ0C5Rvex6QPB3Rss+jLpAMiFxqh+7m2am+ADTjmhO5iZG4bsnHxZoxyVbBlFfP/zF17N/caFeRIOA0y5Rvef9j2k3b3Bgi9HyY0Yqx9dY7fSlrkKPqCUE7qR3L0hJ19Wc9/SExz9Q+dPW7ktad6EwwBSrtH9530Hqx65e0NOvpxpQSD0nM2SJXIXfMAoJ3QH58wNIqcRa6I8wZeJyAbK/YPnT1m76bANwmGAKNfo/sv+h6siMTGN2CTKM/gyEdnQAay2nRXBB4RyQne4ioSKnJMvd6A8PKt24Jw9usEi4TAAlGt0v/TAI3wViTVfJqOCIZHCeptZE7zklJvptufLxixWPZEC/f1nT1p/YIBNwqHElGt0Hw/oZjNz6rM5+TJJcNTqh+flC2krq4KXlHJCdzQzt+LLJPfNkC3j7z1TL+RxILYJhxJSrtF94sFDMs+8F1+OU27wZY1kUyKFzePueFgXvGSUE7qDuyb24cteui8TkeNX2djdG6bOnCjsYT9FEA4lolyj++SBR/W7NxiITaI8zZfjqU9EZHkEkP/17k5RiOAlody0imTBRGw65Z192TBk80M5kkjh736tOLqhQMKhBJRrdEMo6LJFX5apTylPLiq8TQp9nLTD9eVkfbeIsw89to6AE5B5oT5Gv6NeLuvF1nybtrGzajtefaXwJ0oVSTg4pJzQLcJDnuiQry8bExzFaVle30lbFP7AeAeUJ9It4uLBx9mTnSb0uy6AZDONcn1kiK6XA5rr823+PaeLpxscEA4OKE+kW4R41FROvizLTQmOnHJn85nCCYdiKe9It4jVhysGyqn3pm1Ty/T3aIT7k6ePO3sapAvCoUDKO9ItIqLcvCAwoy/rV9nMiRROj1acEA7FUJ6ZbhFXH5kJKDf5Mhhm5TFf1r1dXkaNPoPR/elTLzt91qsrwqEAyjPTLUIsPDD5ctrCAzUpIp4RE7uO7vyMozPCwS7lXdMt4tqh6jpqlGfy5fAVY96uU+7fffIl109ydko4WKS8a7pFeMjTnLrzZZL6ZKC8FNcTnBIOdijvmW4Rbz36hEJ5R1+W5ZBMuf+pEtANJSAcLFDeM90iPISFLnw5hXJx/h2LvAlwajgnHELK2VWsI2RD97E6Xq/ty2Of1h/7wjIAPJVAbAfKtfrHxuu1OfIFjqIMhLPLpws5XD5lQ3luDYuI8x7iagdfpilRqHWCVQAw3efdWZRCcB5MrBdJabZgDVsdr9fW89qZiVMvb3gAbGHCCX2ZMGhDtvrEA9Q/QuxTX/aSd5RiSFejUZld4L6e9V7oz7P6Nhv23cefZPuzgABjYrgGKrCIJp9HlDJjt3SCQ/S0gzk+HJpm8IyeFd6wuVGdFu+F+zSP4T5NG6qyfWLZK0tlo1qNUgoej0Zllh3SsJ+N8XrtMqngdp/Wi+p0fQcA/A/D7i3cV4bgiwAAAABJRU5ErkJggg=='
        />
      </defs>
    </svg>
  );
};

export default WizeLogo;
