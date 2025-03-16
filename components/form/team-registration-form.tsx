"use client";

import { useEffect, useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ICompetition } from "../types/competition";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Athlete type
interface Athlete {
  email: string;
  has_registered_ongoing_activity: boolean;
}

// Schema function with validation
const TeamSchema = (athleteData: Athlete[]) =>
  z.object({
    competition_id: z.number(),
    team_name: z.string().min(1, "Team name is required"),
    no_hp: z.string().min(1, "Phone number is required"),
    team_members: z
      .array(
        z.object({
          email: z
            .string()
            .email("Invalid email format")
            .min(1, "Player email is required")
            .refine((email) => {
              const athlete = athleteData.find((a) => a.email === email);
              return athlete ? !athlete.has_registered_ongoing_activity : false;
            }, { 
              message: "Email tidak terdaftar atau telah mendaftar di kompetisi lain" 
            }),
          id_game: z.string().min(1, "Game ID is required"),
          nickname: z.string().min(1, "Nickname is required"),
          position: z.enum(["leader", "player"]),
        })
      )
      .min(1, "A team must have at least 1 members")
      .max(6, "A team can only have 6 members"),
  });

type TeamFormType = z.infer<ReturnType<typeof TeamSchema>>;

const TeamRegistrationForm = ({ data }: { data: ICompetition }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [athleteData, setAthleteData] = useState<Athlete[]>([]);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await axiosInstance.get("/athletes");
        console.log("Athletes:", response.data);
        setAthleteData(response.data?.data);
      } catch (error) {
        console.error("Error fetching athletes:", error);
      }
    };

    fetchAthletes();
  }, []);

  // Memoize schema validation to prevent re-creation
  const validationSchema = useMemo(() => TeamSchema(athleteData), [athleteData]);

  const form = useForm<TeamFormType>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      competition_id: data?.id,
      team_name: "",
      no_hp: "",
      team_members: [{ email: "", id_game: "", nickname: "", position: "leader" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "team_members",
  });

  const onSubmit = async (formData: TeamFormType) => {
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/registration", formData);
      Swal.fire({
        icon: "success",
        title: "Registration Success",
        text: res.data.message,
      });
      router.push("/order");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: String(error || "Terjadi Kesalahan dalam Register"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase">{data.game.name}</CardTitle>
            <CardDescription>Judul game yang menjadi ajang pertandingan</CardDescription>
          </CardHeader>
        </Card>

        {/* Team Info */}
        <Card className="p-4 space-y-4 border">
          <FormField
            control={form.control}
            name="team_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name / Nama Tim</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Team Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="no_hp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number / Nomor Handphone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Contact Number" {...field} />
                </FormControl>
                <FormDescription>Isi dengan data ketua tim</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Team Members */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="p-4 space-y-4 border">
              <Label>Player {index + 1}</Label>

              <FormField
                control={form.control}
                name={`team_members.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Akun Atlet</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Akun Atlet" {...field} />
                    </FormControl>
                    <FormDescription>Isi dengan email akun yang telah terdaftar menjadi atlet</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team_members.${index}.id_game`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Game ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team_members.${index}.nickname`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="Nickname Game" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* RESTORED SELECT DROPDOWN */}
              <FormField
                control={form.control}
                name={`team_members.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="leader">Leader / Ketua Tim</SelectItem>
                        <SelectItem value="player">Player / Anggota Tim</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  Remove Player
                </Button>
              )}
            </Card>
          ))}

          {fields.length < 6 && (
            <Button type="button" onClick={() => append({ email: "", id_game: "", nickname: "", position: "player" })}>
              Add Player
            </Button>
          )}
        </div>

        <Button type="submit" className="w-full bg-[#ff0000] text-white hover:bg-red-600 disabled:bg-red-400 font-bold" disabled={isSubmitting ||!data.status?.data.is_open}>
          {isSubmitting ? "Submitting..." : "Daftar Sekarang"} 
        </Button>
      </form>
    </Form>
  );
};

export default TeamRegistrationForm;
