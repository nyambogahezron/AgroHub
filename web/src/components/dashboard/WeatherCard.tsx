
import { Cloud, CloudRain, Sun, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// In a real app, this would come from a weather API
const weatherData = {
  current: {
    temp: 68,
    condition: 'Partly Cloudy',
    humidity: 45,
    windSpeed: 8,
  },
  forecast: [
    { day: 'Wed', temp: 72, condition: 'Sunny' },
    { day: 'Thu', temp: 68, condition: 'Partly Cloudy' },
    { day: 'Fri', temp: 65, condition: 'Rain' },
    { day: 'Sat', temp: 70, condition: 'Sunny' },
  ]
};

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="h-5 w-5 text-yellow-500" />;
    case 'partly cloudy':
      return <Cloud className="h-5 w-5 text-gray-400" />;
    case 'rain':
      return <CloudRain className="h-5 w-5 text-blue-400" />;
    default:
      return <Cloud className="h-5 w-5 text-gray-400" />;
  }
};

export function WeatherCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Local Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {getWeatherIcon(weatherData.current.condition)}
            <div className="ml-2">
              <div className="text-2xl font-bold">{weatherData.current.temp}°F</div>
              <div className="text-xs text-muted-foreground">{weatherData.current.condition}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <Thermometer className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Humidity: {weatherData.current.humidity}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Wind: {weatherData.current.windSpeed} mph
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 text-center">
          {weatherData.forecast.map((day) => (
            <div key={day.day} className="bg-muted p-2 rounded">
              <div className="text-xs font-medium">{day.day}</div>
              <div className="flex justify-center my-1">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-xs">{day.temp}°</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
